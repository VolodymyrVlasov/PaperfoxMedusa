<h2 class="text_24">Доставка</h2>
<div class="woocommerce-shipping-fields">
</div>
<ul id="shipping_method" class="woocommerce-shipping-methods col gap width_100">
    <!-- Самовивіз -->
    <li class="checkout_input_radio_wrapper">
        <div class="checkout_input_radio">
            <input type="radio" name="shipping_method[0]" data-index="0" id="shipping_method_0_local_pickup2" value="local_pickup:2" class="shipping_method" checked="checked">
            <label for="shipping_method_0_local_pickup2">Самовивіз з офісу</label>
        </div>
        <span class="checkout_input_radio_legend">
            <input type="text" class="aperance_none text_14__gray" name="billing_city" id="billing_city" placeholder="" value="Київ" autocomplete="address-level2" checked />
            <label for="billing_city">Київ, вул. Ярославська 14/20.
                Окремий вхід з фасаду, цокольний поверх.<br>Видача замовлень: {{weekdays}}"</label>
            <p class="form-row form-row-wide address-field validate-required text_14__gray" id="billing_city_field" data-priority="70">
            </p>

        </span>
    </li>
    <!-- Нова Пошта -->
    <li class="checkout_input_radio_wrapper">
        <div class="checkout_input_radio">
            <input type="radio" id="shipping_method_np_wrapper">
            <label for="shipping_method_0_nova_poshta_shipping_method">Точно Нова Пошта</label>
        </div>
        <div class="checkout_input_radio_legend gap" id="shipping_method_0_nova_poshta_shipping_method_legend">
            <div id="ship-to-different-address" class="checkout_input_checkbox margin-top">
                <input id="ship-to-different-address-checkbox" type="checkbox" name="ship_to_different_address" checked>
                <label for="ship-to-different-address-checkbox">Інший отримувач?</label>
            </div>

            <!-- Інший отримувач - контакти -->
            @@include('../../partials/checkout/checkout-shipping-recepient.php')

            <!-- Нова Пошта - види доставки -->
            @@include('../../partials/checkout/checkout-shipping-types.php')

            <!-- Платіжна адреса (billing address) - Нова Пошта  -->
            @@include('../../partials/checkout/checkout-billing-address.php')

            <!-- Інший отримувач - Нова Пошта -->
            @@include('../../partials/checkout/checkout-shipping-address.php')
        </div>
    </li>
</ul>