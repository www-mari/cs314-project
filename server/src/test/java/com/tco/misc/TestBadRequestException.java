package com.tco.misc;

import com.tco.misc.BadRequestException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class TestBadRequestException {

    BadRequestException item;

    @BeforeEach
    public void createClass() {
        item = new BadRequestException();
    }

    @Test
    @DisplayName("BadRequestException should exist")
    public void badRequestExceptionExsists() {
        assertNotNull(item);
    }

}