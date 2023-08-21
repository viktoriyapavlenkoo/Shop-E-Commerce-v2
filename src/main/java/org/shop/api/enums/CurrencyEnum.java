package org.shop.api.enums;

public enum CurrencyEnum {

    UAH("грн"), GBP("gbp"), USD("usd");

    private final String currency;

    CurrencyEnum(String currency) {
        this.currency = currency;
    }

    public String getCurrency() {
        return currency;
    }
}
