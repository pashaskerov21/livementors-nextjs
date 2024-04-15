import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Livementors",
        short_name: "Livementors",
        description: "Livementors",
        background_color: '#fff',
        theme_color: "#013298",
        display: "standalone",
        icons: [
            {
                src: '/logo/favicon.png'
            }
        ],
    }
}