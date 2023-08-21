package org.shop.api.orm.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.shop.api.enums.CurrencyEnum;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "items_item")
@NamedQuery(name = "ItemsItem.findAll", query = "SELECT i FROM ItemsItem i")
public class ItemsItem implements Serializable {

    @Serial
    private static final long serialVersionUID = 4775156678642009454L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(name = "currency_enum", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private CurrencyEnum currencyEnum;

}
