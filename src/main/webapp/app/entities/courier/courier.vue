<template>
  <div>
    <h2 id="page-heading" data-cy="CourierHeading">
      <span v-text="$t('coopcycleApp.courier.home.title')" id="courier-heading">Couriers</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopcycleApp.courier.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CourierCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-courier"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopcycleApp.courier.home.createLabel')"> Create a new Courier </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && couriers && couriers.length === 0">
      <span v-text="$t('coopcycleApp.courier.home.notFound')">No couriers found</span>
    </div>
    <div class="table-responsive" v-if="couriers && couriers.length > 0">
      <table class="table table-striped" aria-describedby="couriers">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopcycleApp.courier.firstName')">First Name</span></th>
            <th scope="row"><span v-text="$t('coopcycleApp.courier.lastName')">Last Name</span></th>
            <th scope="row"><span v-text="$t('coopcycleApp.courier.phone')">Phone</span></th>
            <th scope="row"><span v-text="$t('coopcycleApp.courier.vehicle')">Vehicle</span></th>
            <th scope="row"><span v-text="$t('coopcycleApp.courier.order')">Order</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="courier in couriers" :key="courier.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CourierView', params: { courierId: courier.id } }">{{ courier.id }}</router-link>
            </td>
            <td>{{ courier.firstName }}</td>
            <td>{{ courier.lastName }}</td>
            <td>{{ courier.phone }}</td>
            <td>{{ courier.vehicle }}</td>
            <td>
              <div v-if="courier.order">
                <router-link :to="{ name: 'OrderView', params: { orderId: courier.order.id } }">{{ courier.order.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CourierView', params: { courierId: courier.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CourierEdit', params: { courierId: courier.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(courier)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="coopcycleApp.courier.delete.question" data-cy="courierDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-courier-heading" v-text="$t('coopcycleApp.courier.delete.question', { id: removeId })">
          Are you sure you want to delete this Courier?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-courier"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCourier()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./courier.component.ts"></script>
