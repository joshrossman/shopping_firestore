import DisplayData from "../pages/DisplayData";
import { render } from "@testing-library/react";

describe('User Name', ()=>{
    test('Check value',()=>{
        const {getByText} = render(<DisplayData/>)
        const myData = getByText(/User List/i)
        expect(myData.textContent).toBe('User List')
        expect(myData.tagName).toBe('H2')
    })
})

describe('Update', ()=>{
    test('Check value',()=>{
        const {getByText} = render(<DisplayData/>)
        const myData = getByText(/Update User/i)
        expect(myData.textContent).toBe('Update User')
        expect(myData.tagName).toBe('H2')
    })
})
