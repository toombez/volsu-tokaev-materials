<script setup lang="ts">
const { id: index } = useRoute().params

const { data: slides } = useFetch('/api/get-slides-links')

const targetSlides = computed(() => {
    if (typeof index === 'undefined') {
        return
    }

    if (typeof slides.value === 'undefined') {
        return
    }

    return slides.value?.[+index]
})
</script>

<template>
    <UPageBody>
        <UContainer>
            <div v-if="targetSlides">
                <h1 class="text-5xl font-bold mb-4">
                    {{ targetSlides.title }}
                </h1>
                <ULink :to="targetSlides.link" external target="_blank">
                    <span>
                        Открыть в новом окне
                    </span>

                    <UIcon name="lucide:arrow-up-right" />
                </ULink>

                <iframe
                    :src="targetSlides.link"
                    class="aspect-video w-full my-6"
                />

                <h2 class="text-4xl font-bold mb-4">
                    Теоретический материал
                </h2>

                <ol>
                    <li
                        v-for="theory in targetSlides.theory"
                    >
                        <ULink :to="theory.link" external target="_blank">
                            <span>
                                {{ theory.title }}
                            </span>

                            <UIcon name="lucide:arrow-up-right" />
                        </ULink>
                    </li>
                </ol>
            </div>
            <div v-else>
                <div>
                    Презентация не найдена
                </div>

                <ULink to="/">
                    <span>
                        Вернуться на главную
                    </span>

                    <UIcon name="lucide:arrow-up-right" />
                </ULink>
            </div>
        </UContainer>
    </UPageBody>
</template>
