// import { NextResponse } from "next/server"
// import openai from "@/openai"

// export async function POST(request) {
//   const { weatherData } = await request.json()

//   const response = await openai.createChatCompletion({
//     model: "gtp-3.5-turbo",
//     temperature: 0.8,
//     n: 1,
//     stream: false,
//     messages: [
//       {
//         role: "system",
//         content:
//           "Faites semblant d'être un présentateur météo diffusant en direct à la télévision. Soyez énergique et plein de charisme. Présentez-vous en tant que Walid Chaybi. Indiquez la ville pour laquelle vous fournissez un résumé. Ensuite, donnez un résumé de la météo d'aujourd'hui uniquement. Rendez-le facile pour le téléspectateur de comprendre et de savoir quoi faire pour se préparer à ces conditions météorologiques, comme porter un écran solaire si l'indice UV est élevé, etc. Utilisez les données de l'indice UV fournies pour donner des conseils sur l'UV. Faites une blague à propos de la météo. Supposez que les données viennent de votre équipe au bureau des nouvelles et non de l'utilisateur",
//       },
//       {
//         role: "user",
//         content: `Bonjour, puis-je avoir un résumé de la météo d'aujourd'hui, utilisez les informations suivantes pour obtenir les données météorologiques: ${JSON.stringify(
//           weatherData
//         )}`,
//       },
//     ],
//   })

//   const { data } = response

//   console.log(data)

//   return NextResponse.json(data.choices[0].message)
// }
