/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CourierDetailComponent from '@/entities/courier/courier-details.vue';
import CourierClass from '@/entities/courier/courier-details.component';
import CourierService from '@/entities/courier/courier.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Courier Management Detail Component', () => {
    let wrapper: Wrapper<CourierClass>;
    let comp: CourierClass;
    let courierServiceStub: SinonStubbedInstance<CourierService>;

    beforeEach(() => {
      courierServiceStub = sinon.createStubInstance<CourierService>(CourierService);

      wrapper = shallowMount<CourierClass>(CourierDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { courierService: () => courierServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCourier = { id: 123 };
        courierServiceStub.find.resolves(foundCourier);

        // WHEN
        comp.retrieveCourier(123);
        await comp.$nextTick();

        // THEN
        expect(comp.courier).toBe(foundCourier);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCourier = { id: 123 };
        courierServiceStub.find.resolves(foundCourier);

        // WHEN
        comp.beforeRouteEnter({ params: { courierId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.courier).toBe(foundCourier);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
