import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import { getImageDimensions } from "@sanity/asset-utils";

import { client } from "@/sanity/client";

import Image from "next/image";

import { getMonth } from "@/utils/dates/getMonth";
import { urlFor } from "@/utils/urlFor";
import { Grid, GridItem, Heading, Text, Link } from "@chakra-ui/react";

const EVENT_QUERY = `*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
  ...,
  headline->,
  venue->
}`;

type EventPageType = {
  params: {
    slug: string;
  };
};

export default async function EventPage({ params }: EventPageType) {
  const event = await client.fetch<SanityDocument>(EVENT_QUERY, params);
  const {
    name,
    date,
    headline,
    image,
    details,
    doorsOpen,
    venue,
    exactDate,
    grams,
  } = event;
  const eventImageUrl = image ? urlFor(image)?.url() : null;
  const artistImageUrl = headline.photo ? urlFor(headline.photo)?.url() : null;
  const eventDate = new Date(date).toDateString();
  const eventDateMonth = `${getMonth(new Date(date).getMonth())}, ${new Date(
    date
  ).getFullYear()}`;
  const eventTime = new Date(date).toLocaleTimeString();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      <GridItem colSpan={2}>
        {(eventImageUrl || artistImageUrl) && (
          <Image
            priority
            alt={name || headline?.name}
            height="310"
            src={eventImageUrl || artistImageUrl || ""}
            width="550"
          />
        )}
      </GridItem>
      <GridItem colSpan={2}>
        {name && (
          <Heading as="h1" size="4xl" py={8}>
            {name}
          </Heading>
        )}
        <Grid templateColumns="repeat(4, 1fr)" gap={1}>
          {headline?.name && (
            <>
              <GridItem colSpan={1}>Artiest</GridItem>
              <GridItem colSpan={3}>
                {headline?.name} {grams ? `- ${grams} gram` : ""}
              </GridItem>
            </>
          )}
          <GridItem colSpan={1}>Datum</GridItem>
          <GridItem colSpan={3}>
            {exactDate ? (
              <>
                {eventDate && <dt>{eventDate}</dt>}
                {eventTime && <dt>{eventTime}</dt>}
              </>
            ) : (
              <>{eventDateMonth && <dt>{eventDateMonth}</dt>}</>
            )}
          </GridItem>
          <GridItem colSpan={1}>Venue</GridItem>
          <GridItem colSpan={3}>{venue.name}</GridItem>
        </Grid>
      </GridItem>
      {details && details.length > 0 && (
        <GridItem colSpan={2} colStart={2} className="content">
          <PortableText
            value={details}
            components={{
              types: {
                image: ({ value }) => (
                  <Image
                    src={urlFor(value.asset._ref)!.url()}
                    alt={value.alt}
                    width={getImageDimensions(value.asset._ref).width}
                    height={getImageDimensions(value.asset._ref).height}
                  />
                ),
              },
              marks: {
                link: ({ children, value }) => (
                  <Link color="orange" href={value.href}>
                    {children}
                  </Link>
                ),
              },
            }}
          />
        </GridItem>
      )}
    </Grid>
  );
}
