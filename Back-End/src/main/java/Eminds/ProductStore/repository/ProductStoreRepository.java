package Eminds.ProductStore.repository;

import Eminds.ProductStore.entity.ProductStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductStoreRepository extends JpaRepository<ProductStore,Long> {
}
