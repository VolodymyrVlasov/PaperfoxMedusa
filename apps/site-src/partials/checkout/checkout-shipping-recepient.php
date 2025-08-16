<div class="shipping_address margin-top-small woocommerce-shipping-fields__field-wrapper col small_gap width_100"
    style="display: none;">
    <div class="row gap width_100">
        <div class="checkout_input_text form-row flex_1" id="shipping_first_name_field" data-priority="10">
            <label for="shipping_first_name">Імʼя</label>
            <input type="text" name="shipping_first_name" id="shipping_first_name" required="true" placeholder="Ліна"
                data-conditional-parent=" shipping_wooccm11" data-conditional-parent-value="1" data-required="0" autocomplete="given-name">
        </div>
        <div class=" checkout_input_text form-row my-custom-class flex_1" id="shipping_mrkvnp_patronymics_field" data-priority="20" style="display: none;">
            <label for="shipping_last_name">По батькові</label>
            <input type="text" name="shipping_mrkvnp_patronymics" id="shipping_mrkvnp_patronymics" autocomplete="family-name" required="true" placeholder="Батьківна">
        </div>
        <div class="checkout_input_text form-row flex_1" id="shipping_last_name_field" data-priority="20">
            <label for="shipping_last_name">Прізвище</label>
            <input type="text" name="shipping_last_name" id="shipping_last_name" placeholder="Костенко" autocomplete="family-name" required="true" data-conditional-parent="shipping_wooccm11" data-conditional-parent-value="1" data-required="0">
        </div>
    </div>
    <div class="row gap width_100">
        <div class="checkout_input_text form-row flex_1" id="shipping_phone_field" data-priority="100">
            <label for="shipping_phone">Мобільний телефон</label>
            <input type="tel" id="shipping_phone" required="true" placeholder="+380635825280" name="shipping_phone" autocomplete="tel" data-conditional-parent="shipping_wooccm11" data-conditional-parent-value="1" data-required="0">
        </div>
    </div>
</div>