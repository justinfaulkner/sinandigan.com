import * as React from "react";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import { StaticImage, IGatsbyImageData } from "gatsby-plugin-image";
import logo from "../images/400w/logo3.png";
import Gallery from "@browniebroke/gatsby-image-gallery";
import styled from "styled-components";
import email from "../images/email.png";

const pageStyles = {
  color: "#232129",
  padding: 0,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const logoStyles = {
  position: "absolute",
  top: 0,
  left: "2em",
  right: 0,
};

const emailStyle = {
  height: "calc(24px + .75vw)",
  verticalAlign: "-8px",
};

const ContentWrapper = styled.div`
  padding: 1em 2em;
  display: flex;
  font-size: calc(16px + 0.75vw);

  flex-direction: row;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftCol = styled.div`
  width: 60%;
  padding-right: 2em;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    padding-right: 0;
  }
`;

const RightCol = styled.div`
  width: 40%;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Headline = styled.div`
  text-align: center;
  font-size: calc(20px + 0.75vw);
  font-family: "Times, serif";
  font-weight: bold;
  margin-top: 0.25em;
`;

interface ImageSharpEdge {
  node: {
    childImageSharp: {
      thumb: IGatsbyImageData;
      full: IGatsbyImageData;
    };
  };
}

interface PageProps {
  data: {
    images: {
      edges: ImageSharpEdge[];
    };
  };
}

const IndexPage: React.FC<PageProps> = ({ data }) => {
  const images = data.images.edges.map(({ node }, index) => ({
    ...node.childImageSharp,
    // Generate name based on the index as caption.
    caption: `Image ${index}`,
  }));

  return (
    <main style={pageStyles}>
      <div>
        <StaticImage src="../images/pool2.jpg" alt="Sinandigan house" />

        <div style={logoStyles}>
          <img src={logo} alt="Sinandigan house" />
        </div>
      </div>
      <Headline>Live next to a coral reef... private beach included</Headline>
      <ContentWrapper>
        <LeftCol>
          <p>
            Welcome to Casa Buena Vista, Located in Sinandigan, a "suburb"
            barrio of Puerto Galera.
          </p>
          <p>
            The house is located near the end of the peninsula, close to
            Sinandigan lighthouse.{" "}
          </p>
          <StaticImage src="../images/map.png" alt="Map of House Location" />
          <p>
            Located 100 feet above the sea, there are spectacular northwest
            views across the Verde Passage.{" "}
          </p>
          <p>
            A spiral staircase leads to a private coral beach with a World
            Heritage Site reef immediately offshore.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CVWWPsynbto"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <p>
            House is located about 3 miles from Sabang beach and 7 miles from
            Puerto Galera. The 3 bedroom house features air conditioning, hot
            water, and all appliances, as well as a pool overlooking the ocean
          </p>
          <p>
            For further information regarding long or short term rental, please
            contact us at{" "}
            <a href="mailto:info@sinandigan.com">info@sinandigan.com</a>.
          </p>
        </LeftCol>
        <RightCol>
          <Gallery images={images} colWidth={50} mdColWidth={50} />
        </RightCol>
      </ContentWrapper>
    </main>
  );
};

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { fields: name }
    ) {
      edges {
        node {
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
            )
            full: gatsbyImageData(
              layout: FIXED
              width: 1512
              height: 2016
              transformOptions: { fit: INSIDE }
            )
          }
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
