<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sendResponse($result, $message){
        $response =[
            "succes" => true,
            "message" => $message,
            "data" => $result,
        ];
        return response()->json($response, 200);
    }
   
    public function sendError($error, $errorMessages = [], $code = 404){
        $response =[
            "succes" => false,
            "message" => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }


}
