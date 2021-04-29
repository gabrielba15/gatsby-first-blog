/* configuramos todo lo que tiene que ver con la construcción de nuestro sitio web. Podemos generar páginas a partir de la información de nuestros plugins o, incluso, utilizando APIs externas a nuestra aplicación.  */

const path = require('path');
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({
            node,
            getNode,
            basePath: 'pages',
        });

        createNodeField({
            node,
            name: 'slug',
            value: slug,
        });
    }
};

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogpostTemplate = path.resolve('./src/templates/blogpost.js');

    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) throw result.errors;

        const post = result.data.allMarkdownRemark.edges;

        post.forEach((post, index) => {
            createPage({
                path: post.node.fields.slug,
                component: blogpostTemplate,
                context: {
                    slug: post.node.fields.slug,
                },
            });
        });

        return null;
    });
};
