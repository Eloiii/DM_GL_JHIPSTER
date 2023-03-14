<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.client.home.createOrEditLabel"
          data-cy="ClientCreateUpdateHeading"
          v-text="$t('coopcycleApp.client.home.createOrEditLabel')"
        >
          Create or edit a Client
        </h2>
        <div>
          <div class="form-group" v-if="client.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="client.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.client.firstName')" for="client-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="client-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.client.firstName.$invalid, invalid: $v.client.firstName.$invalid }"
              v-model="$v.client.firstName.$model"
              required
            />
            <div v-if="$v.client.firstName.$anyDirty && $v.client.firstName.$invalid">
              <small class="form-text text-danger" v-if="!$v.client.firstName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.client.firstName.minLength"
                v-text="$t('entity.validation.minlength', { min: 2 })"
              >
                This field is required to be at least 2 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.client.lastName')" for="client-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="client-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.client.lastName.$invalid, invalid: $v.client.lastName.$invalid }"
              v-model="$v.client.lastName.$model"
              required
            />
            <div v-if="$v.client.lastName.$anyDirty && $v.client.lastName.$invalid">
              <small class="form-text text-danger" v-if="!$v.client.lastName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.client.lastName.minLength"
                v-text="$t('entity.validation.minlength', { min: 2 })"
              >
                This field is required to be at least 2 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.client.phone')" for="client-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="client-phone"
              data-cy="phone"
              :class="{ valid: !$v.client.phone.$invalid, invalid: $v.client.phone.$invalid }"
              v-model="$v.client.phone.$model"
              required
            />
            <div v-if="$v.client.phone.$anyDirty && $v.client.phone.$invalid">
              <small class="form-text text-danger" v-if="!$v.client.phone.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.client.phone.minLength"
                v-text="$t('entity.validation.minlength', { min: 10 })"
              >
                This field is required to be at least 10 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.client.phone.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 10 })"
              >
                This field cannot be longer than 10 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.client.address')" for="client-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="client-address"
              data-cy="address"
              :class="{ valid: !$v.client.address.$invalid, invalid: $v.client.address.$invalid }"
              v-model="$v.client.address.$model"
              required
            />
            <div v-if="$v.client.address.$anyDirty && $v.client.address.$invalid">
              <small class="form-text text-danger" v-if="!$v.client.address.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
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
            :disabled="$v.client.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./client-update.component.ts"></script>
