import numpy as np
from sklearn.metrics import average_precision_score, precision_recall_curve
import pandas as pd
import math
from sklearn.metrics import accuracy_score
from sklearn.metrics import roc_curve

def compute_scores(y_test, y_pred):
    aps = average_precision_score(y_test, y_pred)
    r_p, r_r, r_t = precision_recall_curve(y_test, y_pred)
    r_f1 = 2*r_r*r_p/(r_r + r_p)
    r_f1[np.isnan(r_f1)] = 0
    # print(r_p, r_r)
    print("Average Precision Score:", aps)
    print('Best F1 threshold: ', r_t[np.argmax(r_f1)])
    print('Best F1-Score: ', np.max(r_f1))

    fpr, tpr, thresholds = roc_curve(y_test, y_pred)
    accuracy_scores = []
    for thresh in thresholds:
        accuracy_scores.append(accuracy_score(y_test, [m > thresh for m in y_pred]))

    accuracies = np.array(accuracy_scores)
    max_accuracy = accuracies.max() 
    max_accuracy_threshold =  thresholds[accuracies.argmax()]
    print("Max Accuracy:", max_accuracy)
    print("Max Accuracy Threshold:", max_accuracy_threshold)





df = pd.read_csv('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/gt_annotations_debug.csv')
gt_vehicles = list(df['vehicle_ids'])
image_names = list(df['image_name'])

removal_gt_scores = []
removal_scores = []
retention_gt_scores = []
retention_scores = []
perturb_scores = []
plant_gt_scores = []
plant_scores = []
for i, img_name in enumerate(image_names):
    if str(img_name) == 'nan':
        continue
    if 'trial' in img_name:
        continue
    data_file = img_name.split('.')[0].replace('image_', '') + '.npy'
    data = np.load('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_data/' + data_file, allow_pickle=True)
    #Detect Perturbation based importance vehicles
    perturb_important_vehicles_raw = data[0]
    perturb_important_vehicles_bbs = data[1]
    perturb_important_vehicles = []
    vehicle_positions = data[-1]
    for j, vehicle_info in enumerate(perturb_important_vehicles_raw):
        vehicle_bb = perturb_important_vehicles_bbs[j]
        xs = np.array([vehicle_bb[b][0] for b in range(4)])
        ys = np.array([vehicle_bb[b][1] for b in range(4)])
        for vehicle in vehicle_positions:
            if vehicle_positions[vehicle][0] <= np.max(xs) and vehicle_positions[vehicle][0] >= np.min(xs) and vehicle_positions[vehicle][1] <= np.max(ys) and vehicle_positions[vehicle][1] >= np.min(ys):
                perturb_important_vehicles.append(vehicle)


    removal_important_vehicles = data[2]
    local_removal_scores = {}
    if gt_vehicles[i] == " ":
        gt = []
    else:   
        gt = [int(k) for k in gt_vehicles[i].strip().split(" ")]
    for vehicle in removal_important_vehicles:
        if vehicle[0] in gt:
            removal_gt_scores.append(1)
        else:
            removal_gt_scores.append(0)
        removal_scores.append(vehicle[1])
        if vehicle[0] in perturb_important_vehicles:
            perturb_scores.append(1000)
        else:
            perturb_scores.append(0)
        


    # Retention based important vehicles
    retention_important_vehicles = data[3]
    for vehicle in retention_important_vehicles:
        if vehicle[0] in gt:
            retention_gt_scores.append(1)
        else:
            retention_gt_scores.append(0)
        retention_scores.append(vehicle[1])

    print(img_name, perturb_important_vehicles)
    # plant data
    plant_data = np.load('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_data/plant_data_' + data_file, allow_pickle=True)
    # print(plant_data[0][0][np.argsort(plant_data[0][1])][::-1], gt)
    for v, vehicle in enumerate(plant_data[0][0]):
        if int(vehicle) in gt:
            plant_gt_scores.append(1)
        else:
            plant_gt_scores.append(0)
        plant_scores.append(plant_data[0][1][v])


# print(removal_scores)
# print(retention_scores)
        

print("#######Removal Score###########")
removal_only = compute_scores(np.array(removal_gt_scores), np.array(removal_scores)/np.max(removal_scores))
print("\n")
print("#######Retention Score###########")
retention_only = compute_scores(np.array(retention_gt_scores), np.array(retention_scores)/np.max(retention_scores))
print("\n")
perturb_only = compute_scores(np.array(removal_gt_scores), np.array(perturb_scores)/np.max(perturb_scores))
print("\n")
retention_removal_combined = compute_scores(np.array(removal_gt_scores), np.maximum(np.array(removal_scores)/np.max(removal_scores), np.array(retention_scores)/np.max(retention_scores)))
print("\n")
compute_scores(np.array(removal_gt_scores), np.maximum(np.array(perturb_scores)/np.max(perturb_scores), np.maximum(np.array(removal_scores)/np.max(removal_scores), np.array(retention_scores)/np.max(retention_scores))))

print("\n")
print("R V")
compute_scores(np.array(removal_gt_scores), np.maximum(np.array(removal_scores)/np.max(removal_scores), np.array(perturb_scores)/np.max(perturb_scores)))

print("\n")
print("RET V")
compute_scores(np.array(removal_gt_scores), np.maximum(np.array(retention_scores)/np.max(retention_scores), np.array(perturb_scores)/np.max(perturb_scores)))


print("Removal Score")
removal_only = compute_scores(np.array(removal_gt_scores), np.array(removal_scores))
print("\n")
print("Retention Score")
retention_only = compute_scores(np.array(retention_gt_scores), np.array(retention_scores))
print("\n")
print("V Score")
perturb_only = compute_scores(np.array(removal_gt_scores), np.array(perturb_scores))
print("\n")
print(" R Ret Score")
retention_removal_combined = compute_scores(np.array(removal_gt_scores), np.maximum(np.array(removal_scores), np.array(retention_scores)))
print("\n")
compute_scores(np.array(removal_gt_scores), np.maximum(np.array(perturb_scores), np.maximum(np.array(removal_scores), np.array(retention_scores))))

print("\n")
print("R V")
compute_scores(np.array(removal_gt_scores), np.maximum(np.array(removal_scores), np.array(perturb_scores)))

print("\n")
print("RET V")
compute_scores(np.array(removal_gt_scores), np.maximum(np.array(retention_scores), np.array(perturb_scores)))

print("\n")
print("Plant")
compute_scores(np.array(plant_gt_scores), np.array(plant_scores))

# print(removal_only)
# print(retention_only)
# print(retention_removal_combined)