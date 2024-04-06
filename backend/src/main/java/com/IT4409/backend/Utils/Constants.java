package com.IT4409.backend.Utils;

public class Constants {
    public static final String COMMON_DATE_FORMAT = "dd/MM/yyyy";
    public static final String COMMON_DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String LOCALE_VN = "vi_VN";
    public static final String TIMEZONE_VN = "Asia/Ho_Chi_Minh";

    public interface RATING {
        short ONE = 1;
        short TWO = 2;
        short THREE = 3;
        short FOUR = 4;
        short FIVE = 5;
    }
    public interface PRODUCT_STATUS {
        short IN_STOCK = 1;
        short OUT_OF_STOCK = 0;
    }
    public interface DISCOUNT_STATUS {
        short AVAILABLE = 1;
        short OUT_OF_DATE = 0;
    }
}
