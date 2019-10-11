import React from "react"
import { graphql, useStaticQuery } from 'gatsby'

import styles from "./socialmedianav.module.css"

function getAnchors (data) {
    return  data.map(link => {
        return (
            <a key={link.id} href={link.url}>{link.display}</a>
        )
    })
}

export default () => {
    // data
    const data = useStaticQuery(
        graphql`
        query {
            allSocialJson {
              nodes {
                id,
                display,
                url
              }
            }
          }
        `
    )

    // component
    return (
        <nav className={styles.links} >
            {getAnchors(data.allSocialJson.nodes)}
        </nav>
    )
}