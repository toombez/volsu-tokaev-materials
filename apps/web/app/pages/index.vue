<script setup lang="ts">
const { data: slides } = await useFetch('/api/get-slides-links')
</script>

<template>
    <UContainer>
        <UPageBody>
            <UPageGrid>
                <UPageCard
                    v-for="(slide, i) in slides"
                    :title="slide.title"
                    :to="`/viewer/${i}`"
                    icon="lucide:presentation"
                >
                    <template #description>
                        <ol class="list-decimal pl-4">
                            <li v-for="theory in slide.theory">
                                {{ theory.title }}
                            </li>
                        </ol>
                    </template>
                </UPageCard>
            </UPageGrid>
        </UPageBody>
    </UContainer>
</template>
