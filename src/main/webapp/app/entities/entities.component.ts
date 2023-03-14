import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ClientService from './client/client.service';
import RestaurantService from './restaurant/restaurant.service';
import CourierService from './courier/courier.service';
import OrderService from './order/order.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('clientService') private clientService = () => new ClientService();
  @Provide('restaurantService') private restaurantService = () => new RestaurantService();
  @Provide('courierService') private courierService = () => new CourierService();
  @Provide('orderService') private orderService = () => new OrderService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
