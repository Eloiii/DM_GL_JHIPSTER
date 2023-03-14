/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CourierComponent from '@/entities/courier/courier.vue';
import CourierClass from '@/entities/courier/courier.component';
import CourierService from '@/entities/courier/courier.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Courier Management Component', () => {
    let wrapper: Wrapper<CourierClass>;
    let comp: CourierClass;
    let courierServiceStub: SinonStubbedInstance<CourierService>;

    beforeEach(() => {
      courierServiceStub = sinon.createStubInstance<CourierService>(CourierService);
      courierServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CourierClass>(CourierComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          courierService: () => courierServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      courierServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCouriers();
      await comp.$nextTick();

      // THEN
      expect(courierServiceStub.retrieve.called).toBeTruthy();
      expect(comp.couriers[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      courierServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(courierServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCourier();
      await comp.$nextTick();

      // THEN
      expect(courierServiceStub.delete.called).toBeTruthy();
      expect(courierServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
