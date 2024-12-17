<template>
  <div class="flex flex-col">
    <NavBar />
    <Card class="mx-auto my-8 p-6 max-w-4xl">
      <template #title>
        <span class="text-2xl font-bold">Reports</span>
      </template>
      <template #content>

        <DataTable :value="products" stripedRows tableStyle="min-width: 50rem">
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </template>

      <template #footer>
        <Button label="Save" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from 'primevue/button';
import NavBar from './components/NavBar.vue';

const products = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
]
</script>
