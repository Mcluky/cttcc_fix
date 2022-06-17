import { InputNumber } from "./form/input-number";
import { InputSelect } from "./form/input-select";
import { useState } from "react";
import ToggleButton from "./toggle-button";
import {InputCompare} from "./form/input-compare";

export const CalculatorForm = ({ onSubmit, error }) => {

    const [displayDCInputs, setDisplayDCInputs] = useState(false)

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={onSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Default Inputs</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Fill in all the given information and see the magic happen.</p>
                        {error &&
                            <p className="mt-1 max-w-2xl text-sm text-red-500">{error}</p>
                        }
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <InputNumber
                            label="Pulses [Hz]"
                            id="pulse"
                            defaultValue={84000000}
                            description="Describes the incoming frequency from either the internal clock or an other timers."
                        />
                        <InputNumber
                            label="Prescaler"
                            id="prescaler"
                            description="Scales the incoming pulse by a defined value. Only every n-th pulse is sent to the counter."
                        />
                        <InputNumber
                            label="ARR"
                            id="arr"
                            description="Auto Reload Register. Defines after how many ticks the counter should reset the initial state."
                        />
                        {/* <InputNumber
                            label="Ticks [Hz]"
                            id="ticks"
                            description="Ticks equal the output for the prescaler (Pulse/Prescaler)."
                        /> */}
                        {/*<InputNumber
                            label="Tick [ns]"
                            defaultValue={100_000}
                            description="Time it takes for one tick."
                        />*/}
                        <InputNumber
                            label="Period [ms]"
                            id="period"
                            defaultValue={62}
                            description="Time it takes to reach the overflow (Tick * AAR)."
                        />
                    </div>
                </div>
                
                <ToggleButton
                    state={displayDCInputs}
                    setState={setDisplayDCInputs}
                />

                {displayDCInputs &&
                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Duty Cycle Inputs</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Fill in all the given information and see
                                the magic happen.</p>
                        </div>
                        <div className="space-y-6 sm:space-y-5">
                            <InputSelect
                                label="Mode" id="mode"
                                defaultValue={0}
                                options={[
                                    { value: 0, label: 'Up Counting' },
                                    { value: 1, label: 'Down Counting' }
                                ]}
                                description="The counting mode of the counter."
                            />
                            <InputCompare
                                label="PWM Comparison" id="pwm-comparison"
                                defaultValue={0}
                                comparisons={['<', '<=', '>', '>=']}
                                option1={"CNT"}
                                option2={"CCR"}
                                description="The criteria used for a Duty Cycle being active."
                            />
                            <InputNumber
                                label="Duty Cycle [%]" id="duty-cycle"
                                description="The % of the period where the Duty Cycle should be active."
                            />
                            <InputNumber
                                label="CCR"
                                id="ccr"
                                description="The value used for the comparison deciding if the Duty Cycle is active."
                            />
                            
                        </div>
                    </div>
                }
            </div>
            <div className="pt-5">
                <button
                    type="submit"
                    className="justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Calculate
                </button>
            </div>
        </form>
    )
}