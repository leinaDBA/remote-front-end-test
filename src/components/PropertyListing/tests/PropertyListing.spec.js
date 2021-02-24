import React from 'react';
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import {mount, shallow} from 'enzyme';
import PropertyListing from '../PropertyListing';

describe('PropertyListing', () => {
    afterAll(() => {
        sinon.restore();
    })

    it('should render without crashing', () => {
        const wrapper = shallow(<PropertyListing/>);
        expect(wrapper.find('.PropertyListing')).toHaveLength(1);
    });

    it('should render five property cards', async () => {
        sinon.stub(global, 'fetch').resolves({
            json: () => Array(5).fill({
                id: 73864112,
                bedrooms: 3,
                summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
                displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
                propertyType: 'Flat',
                price: 1950000,
                branchName: 'M2 Property, London',
                propertyUrl: '/property-for-sale/property-73864112.html',
                contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
                propertyTitle: '3 bedroom flat for sale',
                mainImage: 'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg'
            })
        })

        let wrapper
        await act(async () => {
            wrapper = mount(<PropertyListing/>)
            // flush promises
            await new Promise(setImmediate);
        });

        wrapper.update()

        expect(wrapper.find('.PropertyCard')).toHaveLength(5);
    });
});
