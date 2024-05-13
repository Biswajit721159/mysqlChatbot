import OpenAI from "openai";
import {
    // getEmployeeCountByDate,
    // getEmployeeNameByDate,
    // getEmployeeCountByYear,
    // getEmployeeNameByYear,
    // getEmployeeCountByTwoDate,
    // getEmployeeNameByTwoDate,
    getAnyInformation
} from '../BackendConnection/DataBaseConnection'

import { functiondata } from '../BackendConnection/Function'

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_ChatGptApiKey,
    dangerouslyAllowBrowser: true
});

let conversationHistory = [];

export async function get_answer(question) {

    conversationHistory.push({
        'role': 'user',
        'content': question
    })


    try {
        // let messages = [{ 'role': 'user', 'content': question }];

        const functions = functiondata

        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: conversationHistory,
            functions: functions,
            function_call: "auto"
        });

        const responseMessage = response.choices[0].message;
        console.log("first responce is ", responseMessage);

        if (responseMessage.function_call) {
            const availableFunctions = {
                "getAnyInformation": getAnyInformation,
                // "getEmployeeCountByDate": getEmployeeCountByDate,
                // 'getEmployeeNameByDate': getEmployeeNameByDate,
                // "getEmployeeCountByYear": getEmployeeCountByYear,
                // "getEmployeeNameByYear": getEmployeeNameByYear,
                // "getEmployeeCountByTwoDate": getEmployeeCountByTwoDate,
                // "getEmployeeNameByTwoDate": getEmployeeNameByTwoDate
            };
            const functionName = responseMessage.function_call.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(responseMessage.function_call.arguments);
            const functionResponse = await functionToCall(functionArgs);

            console.log("responce coming from tiggersheet backend  ", functionResponse)

            conversationHistory.push({
                'role': 'assistant',
                'content': functionResponse[functionResponse.length - 1]
            })

            return functionResponse.slice(0, functionResponse.length - 1);

            // messages.push(responseMessage);
            // messages.push({
            //     "role": "function",
            //     "name": functionName,
            //     "content": String(functionResponse)
            // });

            // console.log("messages is ",messages)

            // const secondResponse = await openai.chat.completions.create({
            //     model: "gpt-3.5-turbo-0613",
            //     messages: messages
            // });

            // console.log("second responce is ",secondResponse.choices[0].message.content)
            // return secondResponse.choices[0].message.content;
        } else {
            // console.log("not other function called ", responseMessage.content)
            return responseMessage.content;
            // return "We are not getting any results while processing your request"
        }
    } catch {
        return "Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."
    }
}

