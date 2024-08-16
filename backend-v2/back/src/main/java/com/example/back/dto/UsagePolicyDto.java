package com.example.back.dto;

import com.example.back.entity.UsagePolicyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsagePolicyDto {

    private Long idUsagePolicy;
    private String description;
    private UsagePolicyType usagePolicyType;

}
