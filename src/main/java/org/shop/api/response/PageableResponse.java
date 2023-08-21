package org.shop.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PageableResponse<T> extends RestResponse {

    private T data;
    private long count;

    public PageableResponse(T data, long count) {
        this.data = data;
        this.count = count;
    }
}
