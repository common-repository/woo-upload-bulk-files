<?php
/*
Plugin Name: Woocoomerce Upload Bulk Files
Version: 0.1
Plugin URI: ${TM_PLUGIN_BASE}
Description: Upload buld downloadable files to woocommerce product.
Author: Jawad Pro
Author URI: https://www.facebook.com/jawad.jayd
*/


defined( 'ABSPATH' ) or die();


add_action( 'admin_enqueue_scripts' , 'WUBF_main_script_functions' );
function WUBF_main_script_functions()
{
  wp_enqueue_script( 'wpbf-main-script', plugin_dir_url( __FILE__ ) . 'script.js' , array( 'jquery' ) , '', true );
}




?>
