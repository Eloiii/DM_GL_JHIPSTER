<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.order.home.createOrEditLabel"
          data-cy="OrderCreateUpdateHeading"
          v-text="$t('coopcycleApp.order.home.createOrEditLabel')"
        >
          Create or edit a Order
        </h2>
        <div>
          <div class="form-group" v-if="order.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="order.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.order.address')" for="order-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="order-address"
              data-cy="address"
              :class="{ valid: !$v.order.address.$invalid, invalid: $v.order.address.$invalid }"
              v-model="$v.order.address.$model"
              required
            />
            <div v-if="$v.order.address.$anyDirty && $v.order.address.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.address.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.order.price')" for="order-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="order-price"
              data-cy="price"
              :class="{ valid: !$v.order.price.$invalid, invalid: $v.order.price.$invalid }"
              v-model.number="$v.order.price.$model"
              required
            />
            <div v-if="$v.order.price.$anyDirty && $v.order.price.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.price.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.order.price.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.order.status')" for="order-status">Status</label>
            <input
              type="text"
              class="form-control"
              name="status"
              id="order-status"
              data-cy="status"
              :class="{ valid: !$v.order.status.$invalid, invalid: $v.order.status.$invalid }"
              v-model="$v.order.status.$model"
              required
            />
            <div v-if="$v.order.status.$anyDirty && $v.order.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.order.status.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.order.client')" for="order-client">Client</label>
            <select class="form-control" id="order-client" data-cy="client" name="client" v-model="order.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.client && clientOption.id === order.client.id ? order.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.order.restaurant')" for="order-restaurant">Restaurant</label>
            <select class="form-control" id="order-restaurant" data-cy="restaurant" name="restaurant" v-model="order.restaurant">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="order.restaurant && restaurantOption.id === order.restaurant.id ? order.restaurant : restaurantOption"
                v-for="restaurantOption in restaurants"
                :key="restaurantOption.id"
              >
                {{ restaurantOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.order.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./order-update.component.ts"></script>
