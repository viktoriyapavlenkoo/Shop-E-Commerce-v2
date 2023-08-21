package org.shop.api.response;

import java.util.ArrayList;
import java.util.List;

public class RestResponse {

    private List<String> errorDescriptions;

    public RestResponse(List<String> errorDescriptions) {
        this.errorDescriptions = errorDescriptions;
    }

    public RestResponse() {
        this.errorDescriptions = new ArrayList<>();
    }

    public void errorResponse(String errorDescription) {
        errorDescriptions.add(errorDescription);
    }
}
