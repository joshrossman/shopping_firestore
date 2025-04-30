
import NavBar from "../components/NavBar/NavBar";
import { render } from "@testing-library/react";

describe('User Name', ()=>{
    test('Check value',()=>{
        const {getByText} = render(<NavBar/>)
        const myData = getByText(/Add/i)
        expect(myData.textContent).toBe('Add User')

    })
})

