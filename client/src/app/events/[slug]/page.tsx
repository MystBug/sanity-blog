import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import { getImageDimensions } from "@sanity/asset-utils";

import { client } from "@/sanity/client";

import Image from "next/image";

import { getMonth } from "@/utils/dates/getMonth";
import { urlFor } from "@/utils/urlFor";

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
  const doorsOpenTime = new Date(
    new Date(date).getTime() + doorsOpen * 60000
  ).toLocaleTimeString();

  return (
    <main className="content">
      <div>
        <div>
          {(eventImageUrl || artistImageUrl) && (
            <Image
              priority
              alt={name || headline?.name}
              height="310"
              src={eventImageUrl || artistImageUrl || ""}
              width="550"
            />
          )}
          <div>
            <div>
              {name && <h1>{name}</h1>}
              {headline?.name && (
                <dl>
                  <div>
                    <dt>Artiest</dt>
                    <dd>Artiest</dd>
                  </div>
                  <div>
                    <dt>
                      {headline?.name} {grams ? `- ${grams} gram` : ""}
                    </dt>
                  </div>
                </dl>
              )}
              <dl>
                <div>
                  <dt>Datum</dt>
                  <dd>Datum</dd>
                </div>
                <div>
                  {exactDate ? (
                    <>
                      {eventDate && <dt>{eventDate}</dt>}
                      {eventTime && <dt>{eventTime}</dt>}
                    </>
                  ) : (
                    <>{eventDateMonth && <dt>{eventDateMonth}</dt>}</>
                  )}
                </div>
              </dl>
              <dl>
                <div>
                  <dt>Venue</dt>
                  <dd>Venue</dd>
                </div>
                <div>
                  <dt>{venue.name}</dt>
                  {venue.city && venue.country && (
                    <dt>
                      {venue.city}, {venue.country}
                    </dt>
                  )}
                </div>
              </dl>
            </div>
          </div>
        </div>
        {details && details.length > 0 && (
          <div>
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
                    <a href={value.href}>{children}</a>
                  ),
                },
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
