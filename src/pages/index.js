import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

// components
import Header from "../components/header"
import SocialMediaNav from "../components/socialmedianav"

export default ({ data }) => (
    <>
        <Helmet>
            <title>{data.site.siteMetadata.title} | Home</title>
        </Helmet>
        <Header>
            <section>
                <h1>
                    Hi friendo. My name is <span className="highlight">David Wesst</span>. I am <span className="highlight">making a video game</span> I like to call <span className="highlight">#VagabondGame</span>.
                </h1>
            </section>
            <section>
                <h2>
                    You can download and play #VagabondGame <a href="https://cocobokostudios.itch.io/vagabond" className="highlight">here</a>.
                </h2>
            </section>
        </Header>
        <main>
            <section>
                <h2>
                    Here are all my social media links and things:
                    <SocialMediaNav />
                </h2>
            </section>
        </main>
    </>
)

// query
export const data = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
