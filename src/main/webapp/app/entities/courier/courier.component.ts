import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICourier } from '@/shared/model/courier.model';

import CourierService from './courier.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Courier extends Vue {
  @Inject('courierService') private courierService: () => CourierService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public couriers: ICourier[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCouriers();
  }

  public clear(): void {
    this.retrieveAllCouriers();
  }

  public retrieveAllCouriers(): void {
    this.isFetching = true;
    this.courierService()
      .retrieve()
      .then(
        res => {
          this.couriers = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ICourier): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCourier(): void {
    this.courierService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleApp.courier.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCouriers();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
