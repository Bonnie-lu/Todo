import * as React from 'react';
import Hello from './Hello';
import Enzyme from "../../test/test"


function getExclamationMarks(numChars?: number) {
    return numChars && Array(numChars + 1).join('!');
}
test('can insert null', () => {
    expect(getExclamationMarks()).toEqual(undefined)
});
test('can insert null', () => {
    expect(getExclamationMarks(1)).toEqual('!')
});
//   it 为测试案例 一个当前测试案例的提示信息，一个回调函数   enzyme的shallow断言  find("查找节点") expect()期待
it("没有输入enthusiasm level",()=>{
    const hello = Enzyme.shallow(<Hello name="LBB" />)
    expect(hello.find(".greeting").text()).toEqual('Hello LBBundefined')
})
it("输入enthusiasm level 1",()=>{
    const hello = Enzyme.shallow(<Hello name="LBB"  enthusiasmLevel={1}/>)
    expect(hello.find(".greeting").text()).toEqual('Hello LBB!')
})
it("输入enthusiasm level 5",()=>{
    const hello = Enzyme.shallow(<Hello name="LBB"  enthusiasmLevel={5}/>)
    expect(hello.find(".greeting").text()).toEqual('Hello LBB!!!!!')
})
it("输入enthusiasm level -1",()=>{
    expect(()=>{Enzyme.shallow(<Hello name="LBB" enthusiasmLevel={-1}/>);}).toThrow();
})
it("输入enthusiasm level 0",()=>{
    expect(()=>{Enzyme.shallow(<Hello name="LBB" enthusiasmLevel={0}/>);}).toThrow();
})