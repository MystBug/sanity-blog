module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: `/images/${process.env.SANITY_PROJECT_ID}/production/**`,
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
      },
    ],
  },
};
