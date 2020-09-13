<?php
// ************************************
// This file is part of a package from:
// www.freecontactform.com
// See license for details
// ************************************

class FormValidate {
    
    private $error_messages = array(); 
    
    public function validate($name, $display_name, $value, $type) {

        $type_options = explode(",",$type);

        switch ($type_options[0]) {
        	
            case "NOT_EMPTY":
                if(!$this->not_empty($value)) {
                    $this->error_messages[] = "'$display_name' is required";
                } else {
                    if(isset($type_options[1])) {
                        if(!$this->minlength($value, $type_options[1])) {
                            $this->error_messages[] = "'$display_name' must contain a minimum of {$type_options[1]} characters";
                        }
                    }
                    if(isset($type_options[2])) {
                        if(!$this->maxlength($value, $type_options[2])) {
                            $this->error_messages[] = "'$display_name' must contain a maximum of {$type_options[2]} characters";
                        }
                    }
                }
                break;

            case "DIGITS":
                $exp = '/^[0-9]+$/';
                if (!$this->not_empty($value) && !preg_match($exp, $value)) {
                    $this->error_messages[] = "'$display_name' must only contain numbers";
                } 
                break;

            case "EMAIL":
                $exp = '/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i';
                if (!$this->not_empty($value) && !preg_match($exp, $value)) {
                    $this->error_messages[] = "'$display_name' requires a valid email address";
                } 
                break;

            default:
                if(!$this->not_empty($value)) {
                    $this->error_messages[] = "'$display_name' is required";
                }
        } 
    } 
    
    public function anyErrors() {
        if(count($this->error_messages) > 0) {
            return true;
        }
        return false;
    }
    
    public function getErrorString() {
        $return_value = "";
        foreach($this->error_messages as $message) {
            $return_value .= "<li>$message</li>";
        }
        return $return_value;
    }
    
    private function not_empty($value) {
        if (trim($value) == "") {
            return false;
        } else {
            return true;
        } 
    } 

    private function minlength($value, $minlength) {
        if(strlen($value) < $minlength) {
            return false;
        }
        return true;
    }

    private function maxlength($value, $maxlength) {
        if(strlen($value) > $maxlength) {
            return false;
        }
        return true;
    }
    
}