<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="courier">
        <h2 class="jh-entity-heading" data-cy="courierDetailsHeading">
          <span v-text="$t('coopcycleApp.courier.detail.title')">Courier</span> {{ courier.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleApp.courier.firstName')">First Name</span>
          </dt>
          <dd>
            <span>{{ courier.firstName }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.courier.lastName')">Last Name</span>
          </dt>
          <dd>
            <span>{{ courier.lastName }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.courier.phone')">Phone</span>
          </dt>
          <dd>
            <span>{{ courier.phone }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.courier.vehicle')">Vehicle</span>
          </dt>
          <dd>
            <span>{{ courier.vehicle }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.courier.order')">Order</span>
          </dt>
          <dd>
            <div v-if="courier.order">
              <router-link :to="{ name: 'OrderView', params: { orderId: courier.order.id } }">{{ courier.order.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="courier.id" :to="{ name: 'CourierEdit', params: { courierId: courier.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./courier-details.component.ts"></script>
