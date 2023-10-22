import './globals.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'RecipeNook | Discover, Cook, Enjoy Delicious Recipes',
  description: 'Explore a world of culinary delights with RecipeNook. Find a wide range of mouthwatering recipes from various cuisines. From appetizers to desserts, we have the perfect recipe for every occasion.Whether you are a novice cook or an experienced chef, start your culinary journey with us today!',
  keywords: 'recipes, cooking, cuisine, food, culinary, homemade, meals, dishes, desserts, chef, cook, kitchen, diet'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}

      </body>



    </html>
  )
}
