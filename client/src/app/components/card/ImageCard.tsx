"use client";

import Image from "next/image";

import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/layout";

import { urlFor } from "@/utils/urlFor";
import { EventType } from "@/types/event";

type ImageCardProps = {
  item: EventType;
};

export const ImageCard = ({ item }: ImageCardProps) => {
  console.log("item", item);
  const property = {
    imageUrl: urlFor(item.image.asset._ref)?.url(),
    imageAlt: `Image - ${item.name}`,
    beds: 3,
    baths: 2,
    title: item.name,
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
    width: 400,
    height: 200,
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        src={property.imageUrl!}
        alt={property.imageAlt}
        width={property.width}
        height={property.height}
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
