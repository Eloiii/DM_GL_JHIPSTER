<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.courier.home.createOrEditLabel"
          data-cy="CourierCreateUpdateHeading"
          v-text="$t('coopcycleApp.courier.home.createOrEditLabel')"
        >
          Create or edit a Courier
        </h2>
        <div>
          <div class="form-group" v-if="courier.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="courier.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.courier.firstName')" for="courier-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="courier-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.courier.firstName.$invalid, invalid: $v.courier.firstName.$invalid }"
              v-model="$v.courier.firstName.$model"
              required
            />
            <div v-if="$v.courier.firstName.$anyDirty && $v.courier.firstName.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.firstName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.firstName.minLength"
                v-text="$t('entity.validation.minlength', { min: 2 })"
              >
                This field is required to be at least 2 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.courier.lastName')" for="courier-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="courier-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.courier.lastName.$invalid, invalid: $v.courier.lastName.$invalid }"
              v-model="$v.courier.lastName.$model"
              required
            />
            <div v-if="$v.courier.lastName.$anyDirty && $v.courier.lastName.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.lastName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.lastName.minLength"
                v-text="$t('entity.validation.minlength', { min: 2 })"
              >
                This field is required to be at least 2 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.courier.phone')" for="courier-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="courier-phone"
              data-cy="phone"
              :class="{ valid: !$v.courier.phone.$invalid, invalid: $v.courier.phone.$invalid }"
              v-model="$v.courier.phone.$model"
              required
            />
            <div v-if="$v.courier.phone.$anyDirty && $v.courier.phone.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.phone.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.phone.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.courier.phone.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 10 })"
              >
                This field cannot be longer than 10 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.courier.vehicle')" for="courier-vehicle">Vehicle</label>
            <input
              type="text"
              class="form-control"
              name="vehicle"
              id="courier-vehicle"
              data-cy="vehicle"
              :class="{ valid: !$v.courier.vehicle.$invalid, invalid: $v.courier.vehicle.$invalid }"
              v-model="$v.courier.vehicle.$model"
              required
            />
            <div v-if="$v.courier.vehicle.$anyDirty && $v.courier.vehicle.$invalid">
              <small class="form-text text-danger" v-if="!$v.courier.vehicle.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.courier.order')" for="courier-order">Order</label>
            <select class="form-control" id="courier-order" data-cy="order" name="order" v-model="courier.order">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="courier.order && orderOption.id === courier.order.id ? courier.order : orderOption"
                v-for="orderOption in orders"
                :key="orderOption.id"
              >
                {{ orderOption.id }}
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
            :disabled="$v.courier.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./courier-update.component.ts"></script>
