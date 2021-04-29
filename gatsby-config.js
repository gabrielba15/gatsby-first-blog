/* configuramos la metadata (título, descripción y autor) y los plugins de Gatsby que usaremos para construir nuestra aplicación.  */

module.exports = {
    siteMetadata: {
        title: 'First Gatsby Blog',
        author: 'Gabriel Bencomo',
        descripción: 'This is my first time using gatsby',
    },
    plugins: [
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content`,
                name: 'content',
            },
        },
    ],
};
