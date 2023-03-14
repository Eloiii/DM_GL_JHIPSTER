<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="order">
        <h2 class="jh-entity-heading" data-cy="orderDetailsHeading">
          <span v-text="$t('coopcycleApp.order.detail.title')">Order</span> {{ order.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleApp.order.address')">Address</span>
          </dt>
          <dd>
            <span>{{ order.address }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.order.price')">Price</span>
          </dt>
          <dd>
            <span>{{ order.price }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.order.status')">Status</span>
          </dt>
          <dd>
            <span>{{ order.status }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.order.client')">Client</span>
          </dt>
          <dd>
            <div v-if="order.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: order.client.id } }">{{ order.client.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.order.restaurant')">Restaurant</span>
          </dt>
          <dd>
            <div v-if="order.restaurant">
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: order.restaurant.id } }">{{
                order.restaurant.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="order.id" :to="{ name: 'OrderEdit', params: { orderId: order.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./order-details.component.ts"></script>
