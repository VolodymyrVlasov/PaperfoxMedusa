<div class="woocommerce-shipping-fields shipping_address col small_gap width_100 margin-top-small" style="display: none;">
    <!-- Країна - приховано -->
    <p class="form-row form-row-wide address-field update_totals_on_change validate-required" id="shipping_country_field" data-priority="40" style="display: none;">
        <label for="shipping_country" class="">Країна / Регіон&nbsp;<abbr class="required" title="обов&#39;язкове">*</abbr>
        </label>
        <span class="woocommerce-input-wrapper">
            <strong>Україна</strong>
            <input type="hidden" name="shipping_country" id="shipping_country" value="UA" autocomplete="country" class="country_to_state" readonly="readonly">
        </span>
    </p>

    <!-- Регіон -->
    <p class="width_100 form-row checkout_input_text" id="shipping_nova_poshta_region_field" data-priority="120">
        <label for="shipping_nova_poshta_region" class="flex_1">Область</label>
        <span class="woocommerce-input-wrapper">
            <select name="shipping_nova_poshta_region" id="shipping_nova_poshta_region" class="select2-hidden-accessible" data-allow_clear="true" data-placeholder="Оберіть область" tabindex="-1" aria-hidden="true">
                <option value="" selected="selected">Оберіть область</option>
                <option value="71508128-9b87-11de-822f-000c2965ae0e">АРК</option>
                <option value="71508129-9b87-11de-822f-000c2965ae0e">Вінницька</option>
                <option value="7150812a-9b87-11de-822f-000c2965ae0e">Волинська</option>
                <option value="7150812b-9b87-11de-822f-000c2965ae0e">Дніпропетровська</option>
                <option value="7150812c-9b87-11de-822f-000c2965ae0e">Донецька</option>
                <option value="7150812d-9b87-11de-822f-000c2965ae0e">Житомирська</option>
                <option value="7150812e-9b87-11de-822f-000c2965ae0e">Закарпатська</option>
                <option value="7150812f-9b87-11de-822f-000c2965ae0e">Запорізька</option>
                <option value="71508130-9b87-11de-822f-000c2965ae0e">Івано-Франківська</option>
                <option value="71508131-9b87-11de-822f-000c2965ae0e">Київська</option>
                <option value="71508132-9b87-11de-822f-000c2965ae0e">Кіровоградська</option>
                <option value="71508133-9b87-11de-822f-000c2965ae0e">Луганська</option>
                <option value="71508134-9b87-11de-822f-000c2965ae0e">Львівська</option>
                <option value="71508135-9b87-11de-822f-000c2965ae0e">Миколаївська</option>
                <option value="71508136-9b87-11de-822f-000c2965ae0e">Одеська</option>
                <option value="71508137-9b87-11de-822f-000c2965ae0e">Полтавська</option>
                <option value="71508138-9b87-11de-822f-000c2965ae0e">Рівненська</option>
                <option value="71508139-9b87-11de-822f-000c2965ae0e">Сумська</option>
                <option value="7150813a-9b87-11de-822f-000c2965ae0e">Тернопільська</option>
                <option value="7150813b-9b87-11de-822f-000c2965ae0e">Харківська</option>
                <option value="7150813c-9b87-11de-822f-000c2965ae0e">Херсонська</option>
                <option value="7150813d-9b87-11de-822f-000c2965ae0e">Хмельницька</option>
                <option value="7150813e-9b87-11de-822f-000c2965ae0e">Черкаська</option>
                <option value="7150813f-9b87-11de-822f-000c2965ae0e">Чернівецька</option>
                <option value="71508140-9b87-11de-822f-000c2965ae0e">Чернігівська</option>
            </select>
        </span>
    </p>
    <!-- Місто -->
    <div class="width_100 form-row checkout_input_text" id="shipping_nova_poshta_city_field" data-priority="122" class="flex_1">
        <label for="shipping_nova_poshta_city" class="">Місто&nbsp;<abbr class="" title="обов&#39;язкове">*</abbr></label>
        <span class="woocommerce-input-wrapper">
            <select name="shipping_nova_poshta_city" id="shipping_nova_poshta_city" class="select2-hidden-accessible" data-allow_clear="true" data-placeholder="Оберіть місто" tabindex="-1" aria-hidden="true">
                <option value="" selected="selected">Оберіть область</option>
            </select>
        </span>
    </div>
    <!-- Відділення / Поштомат -->
    <div class="width_100 form-row validate-required checkout_input_text" id="shipping_nova_poshta_warehouse_field" data-priority="124" class="flex_1">
        <label for="shipping_nova_poshta_warehouse" class="">Поштомат<span>&nbsp;*</span></label>
        <span class="woocommerce-input-wrapper">
            <select name="shipping_nova_poshta_warehouse" id="shipping_nova_poshta_warehouse" class="select2-hidden-accessible" data-allow_clear="true" data-placeholder="Нічого не вибрано" tabindex="-1" aria-hidden="true">
                <option selected="selected">Оберіть область</option>
            </select>
        </span>
    </div>
    <!-- Адресна доставка -->
    <div class="row gap width_100">
        <div class="checkout_input_text form-row my-custom-class flex_3" id="shipping_mrkvnp_street_field" data-priority="130" style="display: none;">
            <label for="shipping_mrkvnp_street" class="">Вулиця</label>
            <input type="text" class="input-text " name="shipping_mrkvnp_street" id="shipping_mrkvnp_street" placeholder="Введіть перші три літери.." disabled="disabled">
        </div>
        <div class="checkout_input_text form-row flex_1" id="shipping_mrkvnp_house_field" data-priority="132" style="display: none;">
            <label for="shipping_mrkvnp_house" class="">Номер будинку</label>
            <input type="text" class="input-text " name="shipping_mrkvnp_house" id="shipping_mrkvnp_house"
                disabled="disabled">
        </div>
        <div class="checkout_input_text form-row flex_1" id="shipping_mrkvnp_flat_field" data-priority="134" style="display: none;">
            <label for="shipping_mrkvnp_flat" class="">Квартира / офіс</label>
            <input type="text" class="input-text " name="shipping_mrkvnp_flat" id="shipping_mrkvnp_flat" placeholder="" value="" disabled="disabled">
        </div>
    </div>
</div>
