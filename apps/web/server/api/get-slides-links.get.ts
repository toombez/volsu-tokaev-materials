import fs from 'node:fs/promises'

type SlideTheory = {
    title: string
    link: string
}

type SlidesJson = {
    title: string
    link: string
    theory: Array<SlideTheory>
}

export default defineEventHandler(async () => {
    const slidesJson = await fs.readFile('./public/slides.json', { encoding: 'utf-8' })

    return JSON.parse(slidesJson) as Array<SlidesJson>
})
