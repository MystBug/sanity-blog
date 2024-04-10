"use client";

import Image from "next/image";

import { StarIcon, TimeIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/layout";

import { urlFor } from "@/utils/urlFor";
import { EventType } from "@/types/event";
import {
  Heading,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";

type ImageCardProps = {
  item: EventType;
};

export const ImageCard = ({ item }: ImageCardProps) => {
  const unratedStarBg = useColorModeValue("gray.300", "gray.600");

  const property = {
    imageUrl: urlFor(item.image.asset._ref)?.url(),
    imageAlt: `Image - ${item.name}`,
    title: item.name,
    width: 400,
    height: 200,
    to: `/events/${item.slug.current}`,
    grams: item.grams,
    date: new Date(item.date).toDateString(),
    rating: item.rating,
  };

  return (
    <LinkBox
      as="article"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src={property.imageUrl!}
        alt={property.imageAlt}
        width={property.width}
        height={property.height}
        priority
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline" mb="2">
          <Badge borderRadius="full" px="2" colorScheme="orange">
            {property.grams} grams
          </Badge>
        </Box>
        <Heading size="md">
          <LinkOverlay href={property.to}>{property.title}</LinkOverlay>
        </Heading>
        <Box fontSize="sm">{property.date}</Box>

        <Box display="flex" mt="2" alignItems="center">
          {property.rating ? (
            <>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "orange.500" : unratedStarBg}
                  />
                ))}
              <Box as="span" fontSize="sm">
                &nbsp;stars
              </Box>
            </>
          ) : (
            <Box>
              <TimeIcon />
              <Box as="span" fontSize="sm">
                &nbsp;No rating
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </LinkBox>
  );
};
