import { Grid, GridItem } from "@chakra-ui/layout";

import { client } from "@/sanity/client";
import { EventType } from "@/types/event";

import { ImageCard } from "./components/card/ImageCard";

const EVENTS_QUERY = `*[_type == "event" && defined(slug.current)]{
  _id, name, slug, date, image, grams, rating
}|order(date desc)`;

// Display Sanity content on the page
export default async function IndexPage() {
  const events = await client.fetch<EventType[]>(EVENTS_QUERY);

  return (
    <Grid p={8} templateColumns="repeat(4, 1fr)" gap={4}>
      {events.map((event) => (
        <GridItem key={event._id}>
          <ImageCard item={event} />
        </GridItem>
      ))}
    </Grid>
  );
}
