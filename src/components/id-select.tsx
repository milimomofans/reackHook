import React from 'react'
import { Raw } from 'types'
import {Select} from 'antd'

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps,'value' | 'options' | 'onChange'> {
    value:Raw | null | undefined
    onChange:(value?:number) => void
    defaultOptionName?:string
    options?:{name:string,id:number}[]
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value))为true的时候，代表选择默认类型的值
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props 
 */
export const IdSelect = (props:IdSelectProps) => {
    const {value,options,defaultOptionName,onChange,...restProps} = props
    
    return <Select 
        value={options?.length ? toNumber(value) : 0} 
        onChange={value => onChange(toNumber(value))}
        {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value:unknown) => isNaN(Number(value)) ? 0 : Number(value)
