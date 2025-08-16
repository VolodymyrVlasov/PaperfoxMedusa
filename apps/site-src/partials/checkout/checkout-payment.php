<ul class="col gap width_100 woocommerce-checkout-payment" id="payment">
    <p> checkout-payment.php</p>
    <?php
    if (!empty($available_gateways)) {
        foreach ($available_gateways as $gateway) {
            ?>
            <li class="checkout_input_radio_wrapper wc_payment_method payment_method_<?php echo esc_attr($gateway->id); ?>">
                <div class="checkout_input_radio">
                    <input id="payment_method_<?php echo esc_attr($gateway->id); ?>" type="radio" name="payment_method" value="<?php echo esc_attr($gateway->id); ?>" <?php checked($gateway->chosen, true); ?>
                        data-order_button_text="<?php echo esc_attr($gateway->order_button_text); ?>" />

                    <label for="payment_method_<?php echo esc_attr($gateway->id); ?>">
                        <?php echo $gateway->get_title(); /* phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped */?>
                        <?php echo $gateway->get_icon(); /* phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped */?>
                    </label>
                    <p> RRRR </p>
                </div>

                <div class="checkout_input_radio_legend">
                    <span class="text_12__gray">
                        <?php $gateway->payment_fields(); ?>
                    </span>
                </div>

                <?php
        }

    } else {
        echo '<li>';
        wc_print_notice(apply_filters('woocommerce_no_available_payment_methods_message', esc_html__('Sorry, it seems that there are no available payment methods for your location. Please contact us if you require assistance or wish to make alternate arrangements.', 'woocommerce')), 'notice'); // phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
        echo '</li>';
    }
    ?>
</ul>


@@include('../../partials/checkout/checkout-payment.php')



<input id="payment_method_<?php echo esc_attr($gateway->id); ?>" type="radio" name="payment_method" value="<?php echo esc_attr($gateway->id); ?>" <?php checked($gateway->chosen, true); ?>
    data-order_button_text="<?php echo esc_attr($gateway->order_button_text); ?>" />

<label for="payment_method_<?php echo esc_attr($gateway->id); ?>">
    <?php echo $gateway->get_title(); /* phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped */?>
    <?php echo $gateway->get_icon(); /* phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped */?>
</label>