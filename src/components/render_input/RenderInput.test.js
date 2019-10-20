import React from 'react';
import {shallow, mount, render} from 'enzyme';
import RenderInput from "./RenderInput";

describe('Testing snapshop <RenderInput/>', () => {
    it('App have rendered correctly', () => {
        const renderInput = shallow(<RenderInput/>);
        expect(renderInput).toMatchSnapshot();
    })
});

describe('Handlers tests <RenderInput/>', () => {
    it('onChange input name invokes a function', () => {
        const change = jest.fn();
        const renderInput = shallow(<RenderInput
            name={'name'}
            label={'Name'}
            placeholder={'type name'}
            value={''}
            onChange={change}
            error={''}/>);
        renderInput.find('#name').simulate('change', {target: {value: "spam"}});
        expect(change).toHaveBeenCalledWith({target: {value: "spam"}});
    })
});

describe('Show error or doesnt show error', () => {

    it('error exists' , () => {
        let error = 'ERROR';
        const renderInput = mount(<RenderInput
            name={'name'}
            label={'Name'}
            placeholder={'type name'}
            value={''}
            onChange={()=>{}}
            error={error}/>);
        expect(renderInput.exists('input.error')).toBeTrue();
        expect(renderInput.find('div.errors').text()).toBe(error);
    });

    it('error doesnt exist' , () => {
        let error = '';
        const renderInput = mount(<RenderInput
            name={'name'}
            label={'Name'}
            placeholder={'type name'}
            value={''}
            onChange={()=>{}}
            error={error}/>);
        expect(renderInput.exists('input.error')).toBeFalse();
        expect(renderInput.exists('div.errors')).toBeFalse();
    });
});
