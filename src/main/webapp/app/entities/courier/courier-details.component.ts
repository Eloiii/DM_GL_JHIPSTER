import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICourier } from '@/shared/model/courier.model';
import CourierService from './courier.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CourierDetails extends Vue {
  @Inject('courierService') private courierService: () => CourierService;
  @Inject('alertService') private alertService: () => AlertService;

  public courier: ICourier = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.courierId) {
        vm.retrieveCourier(to.params.courierId);
      }
    });
  }

  public retrieveCourier(courierId) {
    this.courierService()
      .find(courierId)
      .then(res => {
        this.courier = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
