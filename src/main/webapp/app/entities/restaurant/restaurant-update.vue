<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.restaurant.home.createOrEditLabel"
          data-cy="RestaurantCreateUpdateHeading"
          v-text="$t('coopcycleApp.restaurant.home.createOrEditLabel')"
        >
          Create or edit a Restaurant
        </h2>
        <div>
          <div class="form-group" v-if="restaurant.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="restaurant.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.restaurant.name')" for="restaurant-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="restaurant-name"
              data-cy="name"
              :class="{ valid: !$v.restaurant.name.$invalid, invalid: $v.restaurant.name.$invalid }"
              v-model="$v.restaurant.name.$model"
              required
            />
            <div v-if="$v.restaurant.name.$anyDirty && $v.restaurant.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurant.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurant.name.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 30 })"
              >
                This field cannot be longer than 30 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.restaurant.address')" for="restaurant-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="restaurant-address"
              data-cy="address"
              :class="{ valid: !$v.restaurant.address.$invalid, invalid: $v.restaurant.address.$invalid }"
              v-model="$v.restaurant.address.$model"
              required
            />
            <div v-if="$v.restaurant.address.$anyDirty && $v.restaurant.address.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurant.address.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.restaurant.phone')" for="restaurant-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="restaurant-phone"
              data-cy="phone"
              :class="{ valid: !$v.restaurant.phone.$invalid, invalid: $v.restaurant.phone.$invalid }"
              v-model="$v.restaurant.phone.$model"
              required
            />
            <div v-if="$v.restaurant.phone.$anyDirty && $v.restaurant.phone.$invalid">
              <small class="form-text text-danger" v-if="!$v.restaurant.phone.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurant.phone.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.restaurant.phone.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 10 })"
              >
                This field cannot be longer than 10 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.restaurant.email')" for="restaurant-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="restaurant-email"
              data-cy="email"
              :class="{ valid: !$v.restaurant.email.$invalid, invalid: $v.restaurant.email.$invalid }"
              v-model="$v.restaurant.email.$model"
            />
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
            :disabled="$v.restaurant.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./restaurant-update.component.ts"></script>
