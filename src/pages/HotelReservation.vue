<template>
    <div class="reservation-page">
      <HeroSection />
      <EventSection />
      <PopularDestinations />
      <PopularHotels />
      <RegionCategory />
    </div>
  </template>

<script setup>
import HeroSection from '@/components/Reservation/HeroSection.vue'
import EventSection from '@/components/Reservation/EventSection.vue'
import PopularDestinations from '@/components/Reservation/PopularDestinations.vue' // 👈 추가
import PopularHotels from '@/components/Reservation/PopularHotels.vue'
import RegionCategory from '@/components/Reservation/RegionCategory.vue'
</script>

<style scoped>
.reservation-page {
  padding-bottom: 4rem;
  padding-left: 1rem;
}
</style>